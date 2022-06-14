"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySignature = verifySignature;

function _builderUtilRuntime() {
  const data = require("builder-util-runtime");

  _builderUtilRuntime = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

function os() {
  const data = _interopRequireWildcard(require("os"));

  os = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
// | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
// | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
function verifySignature(publisherNames, unescapedTempUpdateFile, logger) {
  return new Promise(resolve => {
    // Escape quotes and backticks in filenames to prevent user from breaking the
    // arguments and perform a remote command injection.
    //
    // Consider example powershell command:
    // ```powershell
    // Get-AuthenticodeSignature 'C:\\path\\my-bad-';calc;'filename.exe'
    // ```
    // The above would work expected and find the file name, however, it will also execute `;calc;`
    // command and start the calculator app.
    //
    // From Powershell quoting rules:
    // https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=powershell-7
    // * Double quotes `"` are treated literally within single-quoted strings;
    // * Single quotes can be escaped by doubling them: 'don''t' -> don't;
    // * Backticks can be escaped by doubling them: 'A backtick (``) character';
    //
    // Also note that at this point the file has already been written to the disk, thus we are
    // guaranteed that the path will not contains any illegal characters like <>:"/\|?*
    // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
    const tempUpdateFile = unescapedTempUpdateFile.replace(/'/g, "''").replace(/`/g, "``"); // https://github.com/electron-userland/electron-builder/issues/2421
    // https://github.com/electron-userland/electron-builder/issues/2535

    (0, _child_process().execFile)("powershell.exe", ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `Get-AuthenticodeSignature '${tempUpdateFile}' | ConvertTo-Json -Compress | ForEach-Object { [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($_)) }`], {
      timeout: 20 * 1000
    }, (error, stdout, stderr) => {
      try {
        if (error != null || stderr) {
          handleError(logger, error, stderr);
          resolve(null);
          return;
        }

        const data = parseOut(Buffer.from(stdout, "base64").toString("utf-8"));

        if (data.Status === 0) {
          const name = (0, _builderUtilRuntime().parseDn)(data.SignerCertificate.Subject).get("CN");

          if (publisherNames.includes(name)) {
            resolve(null);
            return;
          }
        }

        const result = `publisherNames: ${publisherNames.join(" | ")}, raw info: ` + JSON.stringify(data, (name, value) => name === "RawData" ? undefined : value, 2);
        logger.warn(`Sign verification failed, installer signed with incorrect certificate: ${result}`);
        resolve(result);
      } catch (e) {
        logger.warn(`Cannot execute Get-AuthenticodeSignature: ${error}. Ignoring signature validation due to unknown error.`);
        resolve(null);
        return;
      }
    });
  });
}

function parseOut(out) {
  const data = JSON.parse(out);
  delete data.PrivateKey;
  delete data.IsOSBinary;
  delete data.SignatureType;
  const signerCertificate = data.SignerCertificate;

  if (signerCertificate != null) {
    delete signerCertificate.Archived;
    delete signerCertificate.Extensions;
    delete signerCertificate.Handle;
    delete signerCertificate.HasPrivateKey; // duplicates data.SignerCertificate (contains RawData)

    delete signerCertificate.SubjectName;
  }

  delete data.Path;
  return data;
}

function handleError(logger, error, stderr) {
  if (isOldWin6()) {
    logger.warn(`Cannot execute Get-AuthenticodeSignature: ${error || stderr}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }

  try {
    (0, _child_process().execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
      timeout: 10 * 1000
    });
  } catch (testError) {
    logger.warn(`Cannot execute ConvertTo-Json: ${testError.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }

  if (error != null) {
    throw error;
  }

  if (stderr) {
    logger.warn(`Cannot execute Get-AuthenticodeSignature, stderr: ${stderr}. Ignoring signature validation due to unknown stderr.`);
    return;
  }
}

function isOldWin6() {
  const winVersion = os().release();
  return winVersion.startsWith("6.") && !winVersion.startsWith("6.3");
} 
// __ts-babel@6.0.4
//# sourceMappingURL=windowsExecutableCodeSignatureVerifier.js.map
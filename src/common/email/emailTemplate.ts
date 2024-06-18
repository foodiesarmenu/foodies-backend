export function emailTemplate(code: String) {
    return `<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
  div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
<body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td bgcolor="#FFA603" align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="480">
          <tr>
            <td align="center" valign="top" style="padding: 40px 10px;">
              <div style="font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;">Foodies</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#FFA603" align="center" style="padding: 0 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="480">
          <tr>
            <td bgcolor="#ffffff" align="left" valign="top" style="padding: 30px; border-radius: 4px 4px 0 0; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 32px; font-weight: 400; line-height: 48px;">
              <h1 style="margin: 0;">Foodies</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="480">
          <tr>
            <td bgcolor="#ffffff" align="left">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td colspan="2" style="padding: 0 30px 10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <p>Copy The Code Below.</p>
                  </td>
                </tr>
               
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" align="center" style="padding: 30px; border-top: 1px solid #dddddd;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="border-radius: 3px;" bgcolor="#FFA603">
                    <a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #FFA603; display: inline-block;">${code}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="480">
          <tr>
            <td bgcolor="#f4f4f4" align="left" style="padding: 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
              <p style="margin: 0;">Email Sent By  "<a href="https://company.de" target="_blank" style="color: #111111; font-weight: 700;">foodiesarmenu@gmail.com</a>".</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</body>
`
}
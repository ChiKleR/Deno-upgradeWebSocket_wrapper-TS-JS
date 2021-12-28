/**
 * Dependant on the ``upgradeWebSocket`` function found in "https://github.com/denoland/deno/blob/main/ext/http/01_http.js".
 * 
 * Last updated to Deno release "v1.17.1".
 * 
 * This comes in handy because ``upgradeWebSocket`` throws certain errors due to client-side mistakes.
**/
export function upgradeWebSocket_wrapper(
  request : Request,
  options : Deno.UpgradeWebSocketOptions = {}
) : (
  Deno.WebSocketUpgrade |
  { response : undefined, socket : undefined }
) {
  try
  {
    return (Deno.upgradeWebSocket(request, options));
  }
  catch (err)
  {
    const err_message = err.message;

    if (
      (err_message == "Invalid Header: 'upgrade' header must contain 'websocket'") ||
      (err_message == "Invalid Header: 'connection' header must contain 'Upgrade'") ||
      (err_message == "Invalid Header: 'sec-websocket-key' header must be set") ||
      (err_message == `Protocol '${options.protocol}' not in the request's protocol list (non negotiable)`)
    ) {
      return ({ response: undefined, socket: undefined });
    }
    else
    {
      throw (err);
    }
  }
}
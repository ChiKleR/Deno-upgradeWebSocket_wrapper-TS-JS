function upgradeWebSocket_wrapper(request, options = {
}) {
    try {
        return Deno.upgradeWebSocket(request, options);
    } catch (err) {
        const err_message = err.message;
        if (err_message == "Invalid Header: 'upgrade' header must contain 'websocket'" || err_message == "Invalid Header: 'connection' header must contain 'Upgrade'" || err_message == "Invalid Header: 'sec-websocket-key' header must be set" || err_message == `Protocol '${options.protocol}' not in the request's protocol list (non negotiable)`) {
            return {
                response: undefined,
                socket: undefined
            };
        } else {
            throw err;
        }
    }
}
export { upgradeWebSocket_wrapper as upgradeWebSocket_wrapper };

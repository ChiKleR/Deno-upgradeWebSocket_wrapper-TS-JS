import { upgradeWebSocket_wrapper } from "./upgradeWebSocket_wrapper.ts";

import { Status } from "https://deno.land/std@0.119.0/http/http_status.ts";
import { serve } from "https://deno.land/std@0.119.0/http/server.ts";


async function handle_request(request : Request) : Promise<Response>
{
  if (request.url == "http://localhost:3000/ws")
  {
      const { response, socket: ws } = upgradeWebSocket_wrapper(request);

      if (response == undefined)
      {
        return (new Response(null, { status: Status.BadRequest }));
      }
      else
      {
        ws!.onopen = () => {
          ws!.send("Heya!");
        };

        return (response!);
      }
  }
  else
  {
    return (new Response(null, { status: Status.NotFound }));
  }
}


serve(handle_request, { hostname: "localhost", port: 3000 });


const ws = new WebSocket("ws://localhost:3000/ws");

ws.onmessage = (evt : MessageEvent<string>) => {
  console.log(evt.data);
};
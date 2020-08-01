import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from "@nestjs/common"
import { Socket, Server } from "socket.io"

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger("AppGateway")


  afterInit(server: any) {
    this.logger.log("initiated")
  }

  handleConnection(client: Socket) {
    this.logger.log(`client Connected ${client.id}`)

  }
  handleDisconnect(client: Socket) {

    this.logger.log(`client Disconnected ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit("msgToClient", text)
    // return { event: "msgToClient", data: text }
  }
}

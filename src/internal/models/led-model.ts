import { KeyModel } from "./key-model";

export class LedModel {
  public rChannelId: number;
  public bChannelId: number;
  public gChannelId: number;

  constructor(public id: number, public key: KeyModel) {
    let zone = 1;

    switch (true) {

      case (14 <= id && id <= 17):
      case (34 <= id && id <= 40):
      case (58 <= id && id <= 63):
      case (81 <= id && id <= 90):
      case (106 <= id && id <= 111):
      case (130 <= id && id <= 135):
      case (155 <= id && id <= 160):
        this.rChannelId = 1;
        this.gChannelId = 2;
        this.bChannelId = 0;

        // color1 = blue;
        // color2 = red;
        // color3 = green;
        zone = 2;
        break;

      case (18 <= id && id <= 23):
      case (41 <= id && id <= 47):
      case (64 <= id && id <= 71):
      case (91 <= id && id <= 95):
      case (115 <= id && id <= 119):
      case (137 <= id && id <= 143):
      case (161 <= id && id <= 167):
      case (191 === id):
      case (193 <= id && id <= 215):
        this.rChannelId = 2;
        this.gChannelId = 0;
        this.bChannelId = 1;

        // color1 = green;
        // color2 = blue;
        // color3 = red;
        zone = 3;
        break;

      default:
        this.rChannelId = 0;
        this.gChannelId = 1;
        this.bChannelId = 2;
        zone = 1;
        break;
    }
  }
}

import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }

  // processSignup
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec();

    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    console.log("before", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("after", input.memberPassword);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default MemberService;

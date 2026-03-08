import type {BaseResponse} from "./type";
import {BaseEnum} from "./enums/baseEnum.ts";
import {appConfig} from "../configs/appConfig.ts";

export class BaseUtil {

    static logger(...logInfo: any) {
        if (appConfig.stage == "Dev") {
            console.log(...logInfo);
        }
    }

    static isApiResponseSuccessful(response: BaseResponse): boolean {
        return response.responseCode == BaseEnum.RESPONSE_CODE_SUCCESS;
        // return response.isSuccessful
        // return ["200", "201"].includes(String(response.code))
    }
}

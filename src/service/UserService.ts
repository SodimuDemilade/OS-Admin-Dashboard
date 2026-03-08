import {BaseService} from "../configs/serviceConfig.ts";
import {ApiTagsEnum} from "../util/enums/apiTagsEnum.ts";
import {ApiRequestMethodsEnum} from "../util/enums/apiRequestMethodsEnum.ts";
import {CreateUserRequest} from "@/model/request/CreateUserRequest.ts";
import {CreateUserResponse} from "@/model/response/CreateUserResponse.ts";
import {ReadUserResponse} from "@/model/response/ReadUserResponse.ts";


const controller = "users";
export const UserService = BaseService.appClient.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.POST,
                body: data,
            }),
            invalidatesTags: [{type: ApiTagsEnum.User, id: "LIST"}],
        }),
        readUser: builder.query<ReadUserResponse, void>({
            query: (data) => ({
                url: `/${controller}/`,
                method: ApiRequestMethodsEnum.GET,
                body: data,
            }),
            providesTags: [{type: ApiTagsEnum.User, id: "LIST"}],
        }),
        // deleteUser: builder.mutation<DeleteUserResponse, DeleteUserRequest>({
        //     query: (data) => ({
        //         url: `/${controller}/delete`,
        //         method: ApiRequestMethodsEnum.DELETE,
        //         body: data,
        //     }),
        //     invalidatesTags: [{type: ApiTagsEnum.LetterOfCredit, id: "LIST"}],
        // }),

    }),
    overrideExisting: true
});

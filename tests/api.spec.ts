import superagent from "superagent";

type resp = {
    page: number;
    per_page: number;
};
const expectedObj: { name: string; job: string } = {
    name: "aqa",
    job: "aqa engeneer",
};

class Requests {
    private constructor(
        public readonly method: string,
        public readonly headers: object,
        public readonly url: string,
        public readonly body?: object,
    ) {}

    public static readonly CreateUser = new Requests("POST", { "Content-Type": "application/json" }, "api/users", {
        name: "aqa",
        job: "aqa engeneer",
    });
    public static readonly UpdateUser = new Requests("PUT", { "Content-Type": "application/json" }, "api/users/2", {
        name: "morpheus",
        job: "zion resident",
    });
    public static readonly DeleteUser = new Requests("DELETE", { "Content-Type": "application/json" }, "api/users/2");
    public static readonly LoginUser = new Requests("POST", { "Content-Type": "application/json" }, "api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
    });
    public static readonly RegisterUser = new Requests("POST", { "Content-Type": "application/json" }, "api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol",
    });
}

describe("API test suite", () => {
    const createUserData = Requests.CreateUser;
    const updateUserData = Requests.UpdateUser;
    const deleteUserData = Requests.DeleteUser;
    const loginUserData = Requests.LoginUser;
    const registerUserData = Requests.RegisterUser;

    it(`status code check all users`, async () => {
        try {
            const response = await superagent.get("https://reqres.in/api/users");
            console.log(response.body as resp);
            expect(response.status).toBe(200);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });
    it(`status code check single user`, async () => {
        try {
            const response = await superagent.get("https://reqres.in/api/users").query({ page: 2, per_page: 1 });
            console.log(response.body as resp);
            expect(response.status).toBe(200);
            expect(response.body.per_page).toBe(1);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it.skip(`status code check single user not found`, async () => {
        try {
            const response = await superagent.get("https://reqres.in/api/users/23");
            expect(response.status).toBe(200);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it(`create user`, async () => {
        try {
            const request = superagent
                .get(`https://reqres.in/api/users`)
                .send(createUserData.body)
                .set(createUserData.headers);
            request.method = createUserData.method;

            const response = await request;
            console.log(response.body);
            expect(response.status).toBe(201);
            expect(response.body.name).toEqual(expectedObj.name);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it(`update user`, async () => {
        try {
            const request = superagent
                .get(`https://reqres.in/${updateUserData.url}`)
                .send(updateUserData.body)
                .set(updateUserData.headers);
            request.method = updateUserData.method;

            const response = await request;
            console.log(response.body);
            expect(response.status).toBe(200);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it(`delete user`, async () => {
        try {
            const request = superagent.get(`https://reqres.in/${deleteUserData.url}`).set(deleteUserData.headers);
            request.method = deleteUserData.method;

            const response = await request;
            console.log(response.body);
            expect(response.status).toBe(204);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it(`login successful`, async () => {
        try {
            const request = superagent
                .get(`https://reqres.in/${loginUserData.url}`)
                .send(loginUserData.body)
                .set(loginUserData.headers);
            request.method = loginUserData.method;

            const response = await request;
            console.log(response.body);
            expect(response.status).toBe(200);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it.skip(`login unsuccessful`, async () => {
        try {
            const request = superagent
                .get(`https://reqres.in/${loginUserData.url}`)
                .send({ email: "peter@klaven" })
                .set(loginUserData.headers);
            request.method = loginUserData.method;

            const response = await request;
            console.log(response.body);
            expect(response.status).toBe(200);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });

    it(`register successful`, async () => {
        try {
            const request = superagent
                .get(`https://reqres.in/${registerUserData.url}`)
                .send(registerUserData.body)
                .set(registerUserData.headers);
            request.method = registerUserData.method;

            const response = await request;
            console.log(response.body);
            expect(response.status).toBe(200);
        } catch (err: any) {
            expect(err.message).toBe("");
        }
    });
});

class CookieDto {
    FK_RequestId?: Number;
    dateTime?: Date;
    cookies?: {name: string, value: string}[] | undefined;
    cookieName?: string;
    cookieValue?: string
    url: string | undefined;
}

export default CookieDto;
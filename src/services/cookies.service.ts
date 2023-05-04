import CookieDto from 'repositories/DataTransferObjects/cookies.dto';
import CookieRepository from '../repositories/cookies.repository';

export default class CookieService {
  private cookieRepository = new CookieRepository();

  public getCookies = async () => this.cookieRepository.getCookies();

  public storeCookieData = async (cookies: CookieDto, Id: Number) => {
    if (cookies.cookies != null) {
      cookies.cookies.forEach(async (cookie) => {
        await this.cookieRepository.storeCookieData(cookies, { name: cookie.name, value: cookie.value }, Id);
      });
    }
  };
}

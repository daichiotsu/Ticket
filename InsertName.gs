function insertName(){
 
  /* スプレッドシートのシートを取得と準備 */
  var mySheet=SpreadsheetApp.getActiveSheet(); //シートを取得
  var rowSheet=mySheet.getDataRange().getLastRow(); //シートの使用範囲のうち最終行を取得
 
  /* html「sendMail1」を取得する */
  var strHtml = HtmlService.createHtmlOutputFromFile("sendMail1").getContent();
  
  /* シートの全ての行について名前を差し込みログに表示*/
  for(var i=1;i<=rowSheet;i++){
 　　
    /* htmlから顧客情報を取得*/ 
    var strName=mySheet.getRange(i,1).getValue();
    var strAddress=mySheet.getRange(i,4).getValue();
    var strTicketNumber=mySheet.getRange(i,5).getValue();
    var strTimeStomp=mySheet.getRange(i,2).getValue();
     
    /*チケット枚数の計算処理*/
    var strFinalAmount;
        strFinalAmount = strTicketNumber*3500+80;    
    
    /*取得した情報を置換*/ 
    var strBody=strHtml.replace(/{名前}/g,strName).replace(/{住所}/,strAddress).replace(/{枚数}/g,strTicketNumber).replace(/{タイムスタンプ}/,strTimeStomp).replace(/{最終金額}/, strFinalAmount);
    
     /* メールアドレスを取得*/
    var strTo=mySheet.getRange(i,6).getValue();　//toアドレス    
    Logger.log(strBody); //ドキュメントの内容をログに表示 
    
    /*メール送信内容strBodyが確定*/
  }
  
  /* 表題、fromアドレス、差出人名を準備 */
  var strSubject="UPSHFT2 チケット決済について"; //表題
  var strFrom="shop@cyclik.jp"; //From
  var strSender="SHOP CYCLIK"; //差出人
  
  /* メールを送信 */
GmailApp.sendEmail(
     strTo, //toアドレス
     strSubject,  //表題
     strBody,　//本文
     {
          from: strFrom,　//fromアドレス
          name: strSender,　//差出人
       htmlBody: strBody   //本文
     }
  );
}
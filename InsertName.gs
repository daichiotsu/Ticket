function insertName(){
 
  /* �X�v���b�h�V�[�g�̃V�[�g���擾�Ə��� */
  var mySheet=SpreadsheetApp.getActiveSheet(); //�V�[�g���擾
  var rowSheet=mySheet.getDataRange().getLastRow(); //�V�[�g�̎g�p�͈͂̂����ŏI�s���擾
 
  /* html�usendMail1�v���擾���� */
  var strHtml = HtmlService.createHtmlOutputFromFile("sendMail1").getContent();
  
  /* �V�[�g�̑S�Ă̍s�ɂ��Ė��O���������݃��O�ɕ\��*/
  for(var i=1;i<=rowSheet;i++){
 �@�@
    /* html����ڋq�����擾*/ 
    var strName=mySheet.getRange(i,1).getValue();
    var strAddress=mySheet.getRange(i,4).getValue();
    var strTicketNumber=mySheet.getRange(i,5).getValue();
    var strTimeStomp=mySheet.getRange(i,2).getValue();
     
    /*�`�P�b�g�����̌v�Z����*/
    var strFinalAmount;
        strFinalAmount = strTicketNumber*3500+80;    
    
    /*�擾��������u��*/ 
    var strBody=strHtml.replace(/{���O}/g,strName).replace(/{�Z��}/,strAddress).replace(/{����}/g,strTicketNumber).replace(/{�^�C���X�^���v}/,strTimeStomp).replace(/{�ŏI���z}/, strFinalAmount);
    
     /* ���[���A�h���X���擾*/
    var strTo=mySheet.getRange(i,6).getValue();�@//to�A�h���X    
    Logger.log(strBody); //�h�L�������g�̓��e�����O�ɕ\�� 
    
    /*���[�����M���estrBody���m��*/
  }
  
  /* �\��Afrom�A�h���X�A���o�l�������� */
  var strSubject="UPSHFT2 �`�P�b�g���ςɂ���"; //�\��
  var strFrom="shop@cyclik.jp"; //From
  var strSender="SHOP CYCLIK"; //���o�l
  
  /* ���[���𑗐M */
GmailApp.sendEmail(
     strTo, //to�A�h���X
     strSubject,  //�\��
     strBody,�@//�{��
     {
          from: strFrom,�@//from�A�h���X
          name: strSender,�@//���o�l
       htmlBody: strBody   //�{��
     }
  );
}
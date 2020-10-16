/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

//会被转义的字符 将这部分字符转换为全角模式，避免转义带来的问题
var arr = ['<','>','\'','"','&','\\'];

CKEDITOR.on('instanceReady', function(e) {
    e.editor.on('key', function (event) {
        var str = event.data.domEvent.$.key;
        if ($.inArray(str, arr) >= 0){
            e.editor.insertText(ban2quan(str));
            return false;
        }
    });
});

CKEDITOR.editorConfig = function( config ) {

    config.removePlugins = 'easyimage,cloudservices,dragdrop,basket';

    config.extraPlugins += config.extraPlugins ? ',wpc,wpc2,wpc3,kityformula' : 'wpc,wpc2,wpc3,kityformula';
    config.extraPlugins += ',lateximage';
	config.skin = 'moono-lisa';
	config.image_previewText = ' '; //清空预览区域显示内容
    config.image2_disableResizer = true;
	config.filebrowserImageUploadUrl = "/upload/image?";//设置提交上传图片按钮处
    config.removeDialogTabs = 'image:advanced;image:Link';

    // config.forcePasteAsPlainText = true;
	config.toolbar = [[ 'Bold', /*'Italic', 'Underline',*/'Image', /*'Table',*/ 'wpc', 'wpc2', 'wpc3', 'kityformula' ]];

	config.enterMode = CKEDITOR.ENTER_P;
	config.shiftEnterMode = CKEDITOR.ENTER_P;
    config.title = false;

    config.coreStyles_bold = {
        element: 'span',
        styles: {'font-weight': 'bold'}
    };
    config.coreStyles_italic = {
        element: 'span',
        styles: {'font-style': 'italic'}
    };
    config.coreStyles_underline = {
        element: 'span',
        styles: {'text-decoration': 'underline'}
    };

 };

function ban2quan(str){
    var tmp = "";
    var charCode;
    for(var i=0;i<str.length;i++) {
        charCode = str.charCodeAt(i);
        if(charCode == 32) {
            tmp= tmp+  String.fromCharCode(12288);
        }

        if(charCode > 33 && charCode < 127) {
            tmp=tmp+String.fromCharCode(charCode + 65248);
        } else {
            tmp=tmp+String.fromCharCode(charCode);
        }
    }

    return tmp;
}

CKEDITOR.config.pasteFilter = 'plain-text';//内容将粘贴为纯文本
// 以对象方式作为配置参数
// CKEDITOR.replace('editor', {
//     uiColor: '#ffccdd'
// });


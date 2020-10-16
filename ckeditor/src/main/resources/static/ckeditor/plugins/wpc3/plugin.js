/**
 * Created by admin on 2017/5/9.
 */
(function() {
    CKEDITOR.plugins.add("wpc3", {
        init: function(a) {
            a.addCommand("wpc3", {
                exec: function () {
                    a.insertElement(CKEDITOR.dom.element.createFromHtml('<div>^|【第一问正确答案】【混淆答案一】【混淆答案二】|^</div>>'));
                }
            });
            a.ui.addButton("wpc3", {
                label: "简答第一问",//调用dialog时显示的名称
                command: "wpc3",
                icon: this.path + "images/placeholder.png"//在toolbar中的图标

            });
        }

    })

})();

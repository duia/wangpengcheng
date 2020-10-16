var current_element;
var latex_alt_text = 'gs';
var img_to_latex_label = '标记为公式图片';
var latex_to_img_label = '标记为普通图片';
CKEDITOR.plugins.add('lateximage', {
    init: function (editor) {
        editor.addCommand('lateximage', {
            exec: function (editor) {
                // 业务代码
                var element = current_element;
                var width = element.$.style.width.split("px")[0];
                var height = element.$.style.height.split("px")[0];
                var bs = 1;
                if (is_image(element.$.alt)) {
                    //询问框
                    // layer.confirm('缩放公式图片比例？', {
                    //     btn: ['1倍', '2倍'] //按钮
                    // }, function () {
                        bs = 0.5;
                        sf(element, width, height, bs);
                    // }, function () {
                    //     bs = 0.25;
                    //     sf(element, width, height, bs);
                    // });

                } else if (is_latex(element.$.alt)) {
                    sf(element, width, height);
                    layer.msg(latex_to_img_label);
                }
            }
        });

        function sf(element, width, height, bs) {
            var resize = element.$.resize;
            var alt_text, latex_label;
            if (resize && resize != "") {
                width = (width / resize) + "px";
                height = (height / resize) + "px";
                element.$.resize = "";
                alt_text = '';
                latex_label = latex_to_img_label + '并且还原图片尺寸';
            } else {
                width = (width * bs) + "px";
                height = (height * bs) + "px";
                element.$.resize = bs;
                alt_text = latex_alt_text;
                latex_label = img_to_latex_label + '缩放' + (bs * 2) + '倍';
            }
            element.$.style.width = width;
            element.$.style.height = height;
            element.$.alt = alt_text;
            layer.msg(latex_label);
        }

        function sleep(d) {
            for (var t = Date.now(); Date.now() - t <= d;) ;
        }

        // 将图片裁剪添加到右键菜单中
        if (editor.addMenuItem) {
            editor.addMenuGroup("lateximage");
            editor.addMenuItem("lateximage", {
                label: "(公式/普通)图片转换",
                icon: this.path + 'icons/lateximage.png',
                command: "lateximage",
                group: "lateximage"
            })
        }

        if (editor.contextMenu) {
            var this_path = this.path;
            // 监听右键菜单事件
            editor.contextMenu.addListener(function (element) {
                // 如果是在图片上右键，才在右键菜单中显示图片裁剪功能
                if (element.$.localName == "img") {
                    current_element = element;
                    if (is_image(element.$.alt)) {
                        editor.getMenuItem('lateximage').label = img_to_latex_label;
                        editor.getMenuItem('lateximage').icon = this_path + 'icons/img2latex.png';
                    } else if (is_latex(element.$.alt)) {
                        editor.getMenuItem('lateximage').label = latex_to_img_label;
                        editor.getMenuItem('lateximage').icon = this_path + 'icons/latex2img.png';
                    }
                    return {
                        lateximage: CKEDITOR.TRISTATE_OFF
                    }
                }
            })
        }
    }
});

function is_latex(alt) {
    return (alt == latex_alt_text);
}

function is_image(alt) {
    if (!alt || alt.length == 0 || alt != latex_alt_text) {
        return true;
    }
    return false;
}

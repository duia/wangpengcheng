package com.wpc.ckeditor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@RequestMapping("/upload")
public class UploadController {

    /**
     * 富文本编辑器上传图片
     * @param request
     * @return
     * @throws IOException
     */
    @RequestMapping(value = {"/image"})
    @ResponseBody
    public String ajaxUploadImage(HttpServletRequest request, String file) throws IOException {
        //根据不同情况处理图片上传功能
        if (!StringUtils.isEmpty(file) && StringUtils.startsWithIgnoreCase(file, "data:image/")) {
            //这部分为数学公式支持 将图片编码转换为图片
        } else {
            //request
        }
        return "处理成功返回图片访问路径";
    }

}

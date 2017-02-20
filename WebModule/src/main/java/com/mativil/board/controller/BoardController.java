package com.mativil.board.controller;

import com.mativil.board.model.DrawInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.mativil.board.service.BoardInfoService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Ivan on 16.02.2017.
 */
@Controller
public class BoardController {
    /*
    public String returnSomething()
    {
        return "hello";
    }
    */
    @Autowired
    private BoardInfoService boardInfoService;

    @RequestMapping("/test")
    public ModelAndView getTestPage() {
        return new ModelAndView("ajax", "message", "Тестируем запросы к Ajax, отсылаемые каждую секунду");
    }

    @RequestMapping("/")
    public String getIndexPage() {
        return "board";
    }


    @RequestMapping(value="/ajaxtest", method=RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody public DrawInfo doSomething(@RequestBody DrawInfo info) {
        info.setClientId("New "+ info.getClientId());
        return info;
    }

    @RequestMapping(value="/board/api", method=RequestMethod.POST,
            produces = "application/json", consumes = "application/json")
    @ResponseBody public List<DrawInfo> getJSONData(@RequestBody List<DrawInfo> info) {
        //info.get(0).setClientId("Vasya");
        String test;
            List<DrawInfo> result = boardInfoService.setDataAndGetResult(info);
            if(result.size() > 0)
                test = "1";
            return result;
    }

    @RequestMapping(value="/board/clear")
    public void clearData() {
        boardInfoService.clearData();
    }
}

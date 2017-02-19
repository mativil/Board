package controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializationFeature;
import model.DrawInfo;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
    List<DrawInfo> list = new ArrayList<DrawInfo>();

    @RequestMapping("/")
    public ModelAndView helloAjaxTest() {
        return new ModelAndView("ajax", "message", "Тестируем запросы к Ajax, отсылаемые каждую секунду");
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
        list.addAll(info);
        //info.get(0).setClientId("Vasya");
            return list;
    }

    @RequestMapping(value="/board/clear")
    public void getJSONData() {
        list.clear();
    }
}

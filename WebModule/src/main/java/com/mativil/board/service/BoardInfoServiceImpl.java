package com.mativil.board.service;

import com.mativil.board.DAO.DrawInfoDAO;
import com.mativil.board.model.DrawInfo;
import com.mativil.board.utils.ValidateData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Ivan on 19.02.2017.
 */
@Component
public class BoardInfoServiceImpl implements BoardInfoService {
    private Map<String, Integer> usersState;
    private List<DrawInfo> actions;
    private boolean firstStep;

    @Autowired
    private DrawInfoDAO drawInfoDAO;

    @Autowired
    private ValidateData validateData;

    public BoardInfoServiceImpl() {
        usersState = new HashMap<String, Integer>();
        actions = new ArrayList<DrawInfo>();
        firstStep = true;
    }

    @Override
    public List<DrawInfo> setDataAndGetResult(List<DrawInfo> newInfoList) {
        //считаем это первой итерацией
        if(actions.size() == 0 && firstStep)
        {
            validateData.validateDatabase();
            actions.addAll(drawInfoDAO.findAll());
            firstStep = false;
        }
        boolean isJustListen = false;
        if(newInfoList.size() == 1 && newInfoList.get(0).getType().equals("NONE"))
            isJustListen = true;
        String user = newInfoList.get(0).getClientId();
        int prevStateId = usersState.get(user) == null ? 0 : usersState.get(user);
        usersState.put(user, actions.size());
        int stateId = usersState.get(user);
        List<DrawInfo> result = getSubList(prevStateId, stateId, user);
        usersState.put(user, actions.size());
        if(!isJustListen)
            for(DrawInfo drawInfo:newInfoList)
            {
                drawInfoDAO.insert(drawInfo);
                actions.add(drawInfo);
            }
       return result;
    }

    private List<DrawInfo> getSubList(int fromIndex, int forIndex, String clientId)
    {
        List<DrawInfo> result = new ArrayList<>();
        for(DrawInfo di : new ArrayList<DrawInfo>(actions.subList(fromIndex, forIndex)))
        {
            if(!di.getClientId().equals(clientId))
                result.add(di);
        }
        return result;
    }

    public void clearData()
    {
        usersState = new HashMap<String, Integer>();
        actions = new ArrayList<DrawInfo>();
        drawInfoDAO.deleteAll();
        actions.add(new DrawInfo("ADMIN", "CLEAR", 0, 0));
    }
}

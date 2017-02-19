package com.mativil.board.service;

import com.mativil.board.model.DrawInfo;
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

    public BoardInfoServiceImpl() {
        clearData();
    }

    @Override
    public List<DrawInfo> setDataAndGetResult(List<DrawInfo> newInfoList) {
        boolean isJustListen = false;
        String test = "0";
        if(newInfoList.size() == 1 && newInfoList.get(0).getType().equals("NONE"))
            isJustListen = true;
        else
        {
            test = "1";
        }
        String user = newInfoList.get(0).getClientId();
        int prevStateId = usersState.get(user) == null ? 0 : usersState.get(user);
        usersState.put(user, actions.size());
        int stateId = usersState.get(user);
        List<DrawInfo> result = getSubList(prevStateId, stateId, user);
        usersState.put(user, actions.size());
        if(!isJustListen)
        actions.addAll(newInfoList);
        if(test.equals("1"))
        {
            if(result.size() > 0)
            test = "2";
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
        actions.add(new DrawInfo("ADMIN", "CLEAR", 0, 0));
    }
}

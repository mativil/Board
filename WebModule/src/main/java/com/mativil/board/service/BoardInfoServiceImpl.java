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
        usersState = new HashMap<String, Integer>();
        actions = new ArrayList<DrawInfo>();
    }

    @Override
    public List<DrawInfo> setDataAndGetResult(List<DrawInfo> newInfoList) {
        boolean isJustListen = false;
        if(newInfoList.size() == 1 && newInfoList.get(0).getType().equals("NONE"))
            isJustListen = true;
        String user = newInfoList.get(0).getClientId();
        int prevStateId = usersState.get(user) == null ? 0 : usersState.get(user);
        int stateId = actions.size();
        List<DrawInfo> result = new ArrayList<DrawInfo>(actions.subList(prevStateId, stateId));
        usersState.put(user, actions.size());
        if(!isJustListen)
        actions.addAll(newInfoList);
        return result;
    }
}

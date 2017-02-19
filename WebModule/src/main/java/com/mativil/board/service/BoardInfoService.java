package com.mativil.board.service;

import com.mativil.board.model.DrawInfo;

import java.util.List;

/**
 * Created by Ivan on 19.02.2017.
 */
public interface BoardInfoService {
    public List<DrawInfo> setDataAndGetResult(List<DrawInfo> newInfoList);
}

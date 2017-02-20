package com.mativil.board.DAO;

import com.mativil.board.model.DrawInfo;

import java.util.List;

/**
 * Created by Ivan on 21.02.2017.
 */
public interface DrawInfoDAO {
    public void insert(DrawInfo drawInfo);
    public DrawInfo findById(int id);
    public List<DrawInfo> findAll();

    void deleteAll();
}

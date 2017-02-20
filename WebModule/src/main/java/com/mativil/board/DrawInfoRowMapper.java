package com.mativil.board;

import com.mativil.board.model.DrawInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Ivan on 21.02.2017.
 */
public class DrawInfoRowMapper implements RowMapper {
    @SuppressWarnings("rawtypes")
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        DrawInfo drawInfo = new DrawInfo();
        drawInfo.setClientId(rs.getString("CLIENTID"));
        drawInfo.setType(rs.getString("TYPE"));
        drawInfo.setX(rs.getDouble("X"));
        drawInfo.setY(rs.getDouble("Y"));
        return drawInfo;
        /*
        employee.setId(rs.getInt("ID"));
        employee.setName(rs.getString("NAME"));
        employee.setAge(rs.getInt("AGE"));
        return employee;
        */
    }

}

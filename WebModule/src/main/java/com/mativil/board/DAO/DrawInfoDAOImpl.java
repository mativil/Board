package com.mativil.board.DAO;
import javax.sql.DataSource;

import com.mativil.board.DrawInfoRowMapper;
import com.mativil.board.model.DrawInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Ivan on 21.02.2017.
 */
@Component
public class DrawInfoDAOImpl implements DrawInfoDAO{
    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insert(DrawInfo drawInfo){

        //Приходится так делать, т.к в стандарте SQL92 нет утвержденной записи автоинкремента
        int maxId = getMaxId();

        String sql = "INSERT INTO DRAWINFO " +
                "(ID, CLIENTID, TYPE, X, Y) VALUES (?, ?, ?, ?, ?)";

        jdbcTemplate = new JdbcTemplate(dataSource);

        jdbcTemplate.update(sql, new Object[] {
                maxId, drawInfo.getClientId(), drawInfo.getType(), drawInfo.getX(), drawInfo.getY()
        });
    }

    public int getMaxId() {
        jdbcTemplate = new JdbcTemplate(dataSource);
        String query = "select coalesce(max(id), 0) from drawinfo";
        int maxId = jdbcTemplate.queryForObject(
                query, Integer.class);
        return maxId + 1;
    }
    public DrawInfo findById(int id) {
        String sql = "SELECT * FROM DRAWINFO WHERE ID = ?";
        jdbcTemplate = new JdbcTemplate(dataSource);
        DrawInfo drawInfo = (DrawInfo) jdbcTemplate.queryForObject(sql, new Object[] { id }, new DrawInfoRowMapper());
        return drawInfo;
    }

    public void deleteAll()
    {
        String sql = "DELETE FROM DRAWINFO";

        jdbcTemplate = new JdbcTemplate(dataSource);

        jdbcTemplate.update(sql);
    }

    public List<DrawInfo> findAll() {
        jdbcTemplate = new JdbcTemplate(dataSource);
        String sql = "SELECT * FROM DRAWINFO";

        List<DrawInfo> drawInfos = new ArrayList<DrawInfo>();

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        for (Map row : rows) {
            DrawInfo drawInfo = new DrawInfo();
            drawInfo.setClientId((String)row.get("CLIENTID"));
            drawInfo.setType((String)row.get("TYPE"));
            drawInfo.setX(Double.parseDouble(String.valueOf(row.get("X"))));
            drawInfo.setY(Double.parseDouble(String.valueOf(row.get("Y"))));
            drawInfos.add(drawInfo);
        }

        return drawInfos;
    }

    public DrawInfoDAOImpl() {
    }
}
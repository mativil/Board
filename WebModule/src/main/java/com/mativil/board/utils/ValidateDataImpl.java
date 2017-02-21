package com.mativil.board.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;

/**
 * Created by Ivan on 21.02.2017.
 */
@Component
public class ValidateDataImpl implements ValidateData{
    @Autowired
    private DataSource dataSource;

    public ValidateDataImpl() {
    }

    public void validateDatabase()
    {
        String tableName = "drawinfo";
        String[] columns = {"id", "clientid", "type", "x", "y"};

        Connection connection = null;
        PreparedStatement ps = null;
        try {
            connection = DataSourceUtils.getConnection(dataSource);

            if(!(validateTable(connection, tableName) && validateTableColumns(connection, tableName, columns)))
            {
                createTable();
            }
        }// Table exists
        catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
        }
    }

    private void createTable()
    {
        String sql =  "CREATE TABLE drawinfo ("+
        "ID int NOT NULL,"+
        "    CLIENTID varchar(50) NOT NULL,"+
        "TYPE varchar(20) DEFAULT NULL,"+
        "X decimal(11,10) DEFAULT NULL,"+
        "Y decimal(11,10) DEFAULT NULL,"+
        "PRIMARY KEY (ID))";

        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        jdbcTemplate.execute(sql);

    }


    private boolean validateTable(Connection connection, String tableName) throws SQLException {
        DatabaseMetaData metadata = connection.getMetaData();
        ResultSet resultSet;
        resultSet = metadata.getTables(null, null, tableName, null);

        return resultSet.next();
    }

    private boolean validateTableColumns(Connection connection, String tableName, String[] columnNames) throws SQLException {
        boolean result = true;
        DatabaseMetaData metadata = connection.getMetaData();
        ResultSet resultSet;
        for(int i = 0; i < columnNames.length && result; i++) {
            resultSet = metadata.getColumns(null, null, tableName, columnNames[i]);

            if(!resultSet.next()) {
                result = false;
            }
        }
        return result;
    }

}

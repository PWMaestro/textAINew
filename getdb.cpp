#include <string>

#include <boost/variant.hpp>
#include <mysql.h>
#include <mysql_connection.h>

using namespace std;

const char server[] = "sql4.freesqldatabase.com";
const char user[] = "sql4497557";
const char password[] = "wnWUnQnnzV";
const char database[] = "sql4497557";
const char sqlQuery[] = "SELECT Id, Content FROM EDocs WHERE type IN (2, 3);";

string getDb()
{
    MYSQL* conn;
    MYSQL_RES* res;
    MYSQL_ROW row;

    int qstate;
    string sumOfTexts = "";

    conn = mysql_init(NULL);

    if (conn != NULL) {
        conn = mysql_real_connect(conn, server, user, password, database, 3306, NULL, 0);
    }

    qstate = mysql_query(conn, sqlQuery);

    if (!qstate)
    {
        res = mysql_store_result(conn);
        row = mysql_fetch_row(res);
        while (row)
        {
            sumOfTexts.append(" ");
            sumOfTexts.append(row[1]);

            row = mysql_fetch_row(res);
        }
    }

    mysql_free_result(res);
    mysql_close(conn);

    return sumOfTexts;
}

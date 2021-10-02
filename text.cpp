#include <iostream>
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <cgicc/CgiDefs.h>
#include <cgicc/Cgicc.h>
#include <cgicc/HTTPHTMLHeader.h>
#include <cgicc/HTMLClasses.h>

#include <boost/variant.hpp>
#include <mysql.h>
#include <mysql_connection.h>

using namespace std;
using namespace cgicc;

const char* server = "database-1.cvibdhufjj7d.us-east-1.rds.amazonaws.com";
const char* user = "admin";
const char* password = "artiomsitikoff";
const char* database = "database-1";
const char* sqlQueryForTextAI = "SELECT * FROM texts";

string getDB();

int main()
{
    setlocale(LC_ALL, "Russian");

    Cgicc form;
    string name;

    cout << "Content-type:text/html\r\n\r\n";

    cout << getDB() << "\n";
    
    return 0;
}

string getDB(){
    MYSQL* conn;
    MYSQL_RES* res;
    MYSQL_ROW row;

    int qstate;

    string sumOfTexts = "";

    conn = mysql_init(NULL);

    if (conn != NULL) {
        conn = mysql_real_connect(conn, server, user, password, database, 3306, NULL, 0);
    }

    qstate = mysql_query(conn, sqlQueryForTextAI);

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

#!/env/bin/ruby
# encoding: utf-8

require 'sqlite3'

class DBManager
  """
  Table AVAILABLE_INFO:
  [0]serial         -- char[255]
  [1]start          -- int
  [2]end            -- int
  """

  def initialize
    @db = SQLite3::Database.new "./lhsjlc4.sqlite3"
    createDB
  end

  def createDB
    begin
      @db.execute "create table AVAILABLE_INFO(serial char[255], start int, end int)"
    rescue Exception => e
    end
  end

  def publish info
    @db.execute "update AVAILABLE_INFO set start = #{info[1]}, end = #{info[2]} where serial = '#{info[0]}'"
    @db.execute "insert into AVAILABLE_INFO values(?, ?, ?)", info
  end

  # def updateDB row
  #   @db.execute "update AVAILABLE_INFO set memTimes = #{row[2]}, remindTime = #{row[3]}, remindTimeStr = '#{row[4]}' where wordID = '#{row[5]}'" if not COMM::REVERSE_MODE
  # end

  def delete serial
    found = @db.execute("select * from AVAILABLE_INFO where serial = '#{serial}'").size != 0 ? true : false
    @db.execute "delete from AVAILABLE_INFO where serial = '#{serial}'"

    return found
  end

  def view
    @db.execute "select * from AVAILABLE_INFO"
  end

  def closeDB
    @db.close
  end
end

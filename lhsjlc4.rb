#!/env/bin/ruby
# encoding: utf-8

require 'sinatra'
require 'time'
require 'json'

require './db.rb'

setting_file = "preferences.json"

set :bind, '0.0.0.0'

# please set port as 4496 in master branch
set :port, JSON.parse(File.read(setting_file))["port"] if File.exist? setting_file

DEV_MODE = false

def wechat_browser?
  return request.user_agent.include? "MicroMessenger"
end

get '/' do
  return erb :_403 unless wechat_browser? or DEV_MODE
  return erb :index
end

get '/publish_jump' do
  erb :publish_jump
end

get '/delete_jump' do
  erb :delete_jump
end

get '/view' do
  return erb :_403 unless wechat_browser? or DEV_MODE
  erb :view
end

get '/current' do
  return erb :_403 unless wechat_browser? or DEV_MODE
  erb :current
end

get '/publish' do
  return erb :_403 unless wechat_browser? or DEV_MODE
  erb :publish
end

post '/delete' do
  serial = params[:serial]

  dbMgr = DBManager.new
  dbMgr.delete serial
  dbMgr.closeDB

  redirect :delete_jump
end

post '/publish' do
  time_s = params[:from].to_i / 1000
  time_e = params[:to].to_i / 1000
  serial = params[:serial]

  info = [serial, time_s, time_e]

  dbMgr = DBManager.new
  dbMgr.publish info
  dbMgr.closeDB

  redirect :publish_jump
end

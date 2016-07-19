require 'sinatra'
require 'time'

set :bind, '0.0.0.0'

get '/' do
  erb :index
end

get '/view' do
  erb :view
end

get '/publish' do
  erb :publish
end

post '/publish' do
  time_s = Time.at(params[:from].to_i / 1000)
  time_e = Time.at(params[:to].to_i / 1000)
  serial = params[:serial]

  redirect 'view'
end

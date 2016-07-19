require 'sinatra'

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
  puts "year: " + params[:year]
  redirect 'view'
end

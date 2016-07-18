require 'sinatra'

set :bind, '0.0.0.0'

get '/' do
  "Hello sinatra !!!"
end

get '/publish' do
  erb :publish
end

post '/publish' do
  puts "year: " + params[:year]
  erb :publish
end

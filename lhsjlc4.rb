require 'sinatra'

set :bind, '0.0.0.0'

get '/' do
  erb :date
end

post '/publish' do
  puts "year: " + params[:year]
  erb :date
end

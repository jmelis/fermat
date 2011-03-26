#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'

set :public, 'web'

mime_type :ttf, "application/octet-stream"
mime_type :woff, "application/octet-stream"
mime_type :ggb, "application/octet-stream"

get '/' do
    File.read(File.dirname(__FILE__)+'/web/fermat.html')
end

get '/questions/:question' do
    File.read(File.dirname(__FILE__) + '/web/questions/' + params[:question])
end

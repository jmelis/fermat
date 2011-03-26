#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'models/arduino'

arduino = Arduino.new

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

# Arduino API
get '/arduino/delay/:n' do
    n = params[:n]
    arduino.delay(n)
end

get '/arduino/:action' do
    action = params[:action]
    case action
    when "start"
        arduino.start
    when "stop"
        steps = arduino.stop
        steps.to_s
    when "forward"
        arduino.forward
    when "backward"
        arduino.backward
    when "toggle"
        arduino.toggle
    when "sense"
        sense = arduino.sense?
        if sense
            "FORWARD"
        else
            "BACKWARD"
        end
    end
end

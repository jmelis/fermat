#!/usr/bin/ruby

$: << File.dirname(__FILE__)

require 'fermat.rb'

run Sinatra::Application

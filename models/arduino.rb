#!/usr/bin/env ruby

require 'rubygems'
require 'serialport'

class MockSerial
    def initialize(file = nil)
        @file = file
        if @file
            @log_file = File.open(file,'w')
            @log_file.sync = true
        end
    end

    def write(msg)
        log_msg = "#{Time.now} - #{msg}"

        if @file
            @log_file.write(log_msg + "\n")
            #@log_file.flush
        else
            puts log_msg
        end
    end

    def read_timeout(n)
        rand(10000)
    end

    def flow_control
        true
    end
end

class Arduino
    def initialize(dev = "/dev/ttyUSB0", bd = 9600 )
        @sp = MockSerial.new('/tmp/arduino')
        #@sp = SerialPort.new dev, bd
        #@sp.flow_control
        @sense = true # forward
    end

    def start
        @sp.write "START"
    end

    def stop
        @sp.write "STOP"
        @sp.read_timeout(10)
    end

    def forward
        @sp.write "FORWARD"
    end

    def backward
        @sp.write "BACKWARD"
    end

    def toggle
        if @sense
            backward
            @sense = false # backward
        else
            forward
            @sense = true # forward
        end
    end

    def delay(n)
        #TBD: N > 300
        @sp.write(n.to_s)
    end

    def sense?
        @sense
    end
end

__END__

require 'rubygems'
require 'serialport'
sp.write "START"
sp.read
sp.write "STOP";sp.read
sp.write "STOP"
sp.write "FORWARD"
sp.flow_control
sp.read_timeout 1
sp.read_timeout(10)
sp.read_timeout=10
puts sp.read
sp.write "STOP"; puts sp.read
_
_.strip
sp.write "BACKWARD"
sp.write "300"
sp.write "1000"
sp.write "10000"
sp.write "500"


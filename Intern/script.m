% Read the input data from the CSV file
        data = csvread('${inputFilePath}');
        t = data(:, 1);
        input_wave = data(:, 2);

        % Parameters for the random sine wave
        amplitude = rand() * 2 - 1; % Random amplitude between -1 and 1
        frequency = ${frequency};    % Use the provided frequency (between 0 and 1)
        phase = rand() * 2 * pi;    % Random phase between 0 and 2*pi

        % Generate the random sine wave
        sine_wave = amplitude * sin(2 * pi * frequency * t + phase);

        % Add the sine wave to the input wave
        output_wave = input_wave + sine_wave;

        % Save the output data to a CSV file
        output_data = [t, output_wave];
        csvwrite('${outputFilePath}', output_data);
function lms_denoise(mu, inputFile, M, uniqueIdentifier)
    % Function to apply LMS denoising to an EEG signal
    %
    % Parameters:
    %   mu: Step size for LMS
    %   inputFile: Name of the input .csv file containing the EEG signal
    %   M: Length of the LMS filter
    %   uniqueIdentifier: Unique identifier for saving the image

    % Default values for fs
    fs = 100;  % Sampling frequency in Hz

    clc;
    close all;

    % Load the EEG signal from the input file
    x = csvread(inputFile);

    % Check the length of the signal
    n = length(x);

    % Initialize LMS weight vector
    w_lms = zeros(M, 1); % Initialize LMS weight vector

    % Generate the signal corrupted with noise
    D = x;
    A = D + 0.5 * randn(size(D)); % Simulated noisy signal

    % Initialization for LMS algorithm
    B_lms = zeros(1, n); % LMS output signal
    Err_lms = zeros(1, n); % LMS error signal
    weights_lms = zeros(M, n); % Array to store LMS weights

    % Adding padding to the signal for multi-tap processing
    A_padded = [zeros(M-1, 1); A]; % Transpose the zeros matrix to make it compatible with A
    t = (0:n-1) / fs;

    % Apply the LMS algorithm
    for i = M:n
        % Extract the current segment of the signal for multi-tap processing
        A_i = A_padded(i:-1:i-M+1);
        
        y_lms = w_lms' * A_i;
        Err_lms(i) = D(i) - y_lms;
        w_lms = w_lms + mu * A_i * Err_lms(i);
        weights_lms(:, i) = w_lms;
        B_lms(i) = w_lms' * A_i;
    end

    % Display the signals
    figure('Position', [100, 100, 800, 800]); % Increase figure height
    plot(t, D);
    title('Desired Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    
    saveas(gcf, sprintf('Outputs/lms_denoise_desired_%s.png', uniqueIdentifier));
    close(gcf);
    figure;
    plot(t, A);
    title('Signal Corrupted with Noise');
    xlabel('Time (s)');
    ylabel('Amplitude');
    
    saveas(gcf, sprintf('Outputs/lms_denoise_noise_%s.png', uniqueIdentifier));
    close(gcf);
    figure;
    plot(t, B_lms);
    title('LMS Output Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    legend('LMS Output');
    saveas(gcf, sprintf('Outputs/lms_denoise_output_%s.png', uniqueIdentifier));
    close(gcf);
    figure;
    plot(t, Err_lms);
    title('LMS Error Signal');
    xlabel('Time (s)');
    ylabel('Error');
    saveas(gcf, sprintf('Outputs/lms_denoise_error_%s.png', uniqueIdentifier));
    close(gcf);
end

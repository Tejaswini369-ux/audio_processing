function lms_denoise(mu, experiment, inputFile, order, uniqueIdentifier)
    % Function to apply LMS denoising to an EEG signal
    %
    % Parameters:
    %   mu: Learning rate for LMS
    %   inputFile: Name of the input .csv file containing the EEG signal
    %   order: Order of the LMS filter
    %   uniqueIdentifier: Unique identifier for saving the image
    % Default values for delta and fs
    %experiment = 100;  % Number of experiments for averaging
    % Clear and close all previous states
    clc;
    close all;
    % Load the EEG signal from the input file
    x = csvread(inputFile)';
    
    % Check the length of the signal
    iteration = length(x);
    % Initialize optimal weight vector
    %w_opt = [0.1, 0.4, 0.4, 0.1]'; % Adjust size according to `order`
    % Initialize vectors to store the weights and the mean square deviation (MSD)
    %MSD_LMS_main = zeros(iteration, 1); % Mean square deviation (MSD)
    w_LMS_main = zeros(order, 1);
    % Generate the signal corrupted with noise
    A = x + 0.5 * randn(1, iteration); % Simulated noisy signal
    for i = 1:experiment
        % generate noise
        % noise=0.1*randn(iteration,1);
        % initialize adaptive filter coefficients and input vector
        w_LMS = zeros(order, 1);
        An = zeros(order, 1);
        %MSD_LMS = zeros(iteration);
    end
    
    % Apply the LMS algorithm
    for n = 1:iteration
        An = [A(n); An(1:end-1)]; % input regressor vector
        % Update the filter coefficients
        e_LMS = x(n) - An' * w_LMS;
        w_LMS = w_LMS + mu * e_LMS * An;
        % Store the MSD
        %MSD_LMS(n) = norm(w_LMS - w_opt, 2)^2;
        
        %MSD_LMS_main = MSD_LMS_main + MSD_LMS;
        w_LMS_main = w_LMS_main + w_LMS;
    end
    
    %MSD_LMS_main = MSD_LMS_main / experiment;
    w_LMS_main = w_LMS_main / experiment;
    
    estimated_output_signal = zeros(iteration, 1);
    for n = 1:iteration
        An = [A(n); An(1:end-1)]; % input regressor vector
        estimated_output_signal(n) = An' * w_LMS_main;
        e_LMS(n) = x(n) - An' * w_LMS_main;
    end
    
    % Display of signals
    figure('Position', [100, 100, 600, 800]); % Set figure size
    subplot(5,1,1), plot(x);
    title('Desired Signal');
    subplot(5,1,2), plot(A);
    title('Signal Corrupted with Noise');
    subplot(5,1,3), plot(estimated_output_signal);
    legend('LMS Output');
    title('Adaptive Filter Outputs');
    subplot(5,1,4), plot(e_LMS);
    title('LMS Error Signal');
    
    % Adjust position to increase space between plots
    set(gcf, 'Units', 'Normalized', 'OuterPosition', [0, 0, 1, 1]);  % Maximize figure window
    set(gcf, 'PaperPositionMode', 'auto');  % Set figure size to be the same on printed paper
    
    % Save figure with unique identifier
    saveas(gcf, sprintf('Outputs/lms_denoise_%s.png', uniqueIdentifier));
    close(gcf);
end

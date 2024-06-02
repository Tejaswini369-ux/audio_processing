function lms_denoise(mu, inputFile, order, uniqueIdentifier)
    % Function to apply LMS denoising to an EEG signal
    % Parameters:
    %   mu: Learning rate for LMS
    %   inputFile: Name of the input .csv file containing the EEG signal
    %   order: Order of the LMS filter
    %   uniqueIdentifier: Unique identifier for saving output files

    % Default values for delta and fs
    experiment = 100;  % Number of experiments for averaging

    % Clear and close all previous states
    clc;
    close all;

    % Load the EEG signal from the input file
    x = csvread(inputFile)';
    
    % Check the length of the signal
    iteration = length(x);

    % Initialize optimal weight vector
    w_opt = [0.1, 0.4, 0.4, 0.1]'; % Adjust size according to \`order\`
    w_opt = w_opt(1:order); % Ensure w_opt matches the filter order

    % Initialize vectors to store the weights and the mean square deviation (MSD)
    MSD_LMS_main = zeros(iteration, 1); % Mean square deviation (MSD)
    w_LMS_main = zeros(order, 1);

    % Generate the signal corrupted with noise
    A = x + 0.5 * randn(1, iteration); % Simulated noisy signal

    for i = 1:experiment
        % Initialize adaptive filter coefficients and input vector
        w_LMS = zeros(order, 1);
        An = zeros(order, 1);
        MSD_LMS = zeros(iteration, 1);

        % Apply the LMS algorithm
        for n = 1:iteration
            An = [A(n); An(1:end-1)]; % Input regressor vector

            % Update the filter coefficients
            e_LMS = x(n) - An' * w_LMS;
            w_LMS = w_LMS + mu * e_LMS * An;

            % Store the MSD
            MSD_LMS(n) = norm(w_LMS - w_opt, 2)^2;
        end

        MSD_LMS_main = MSD_LMS_main + MSD_LMS;
        w_LMS_main = w_LMS_main + w_LMS;
    end

    MSD_LMS_main = MSD_LMS_main / experiment;
    w_LMS_main = w_LMS_main / experiment;

    % Estimate the output signal
    estimated_output_signal = zeros(iteration, 1);
    for n = 1:iteration
        An = [A(n); An(1:end-1)]; % Input regressor vector
        estimated_output_signal(n) = An' * w_LMS_main;
        e_LMS(n) = x(n) - An' * w_LMS_main;
    end

    % Save the desired signal plot
    figure;
    plot(x);
    title('Desired Signal');
    saveas(gcf, sprintf('Outputs/desired_signal_%s.png', uniqueIdentifier));

    % Save the noisy signal plot
    figure;
    plot(A);
    title('Signal Corrupted with Noise');
    saveas(gcf, sprintf('Outputs/noisy_signal_%s.png', uniqueIdentifier));

    % Save the LMS output signal plot
    figure;
    plot(estimated_output_signal);
    legend('LMS Output');
    title('Adaptive Filter Outputs');
    saveas(gcf, sprintf('Outputs/lms_output_signal_%s.png', uniqueIdentifier));

    % Save the error signal plot
    figure;
    plot(e_LMS);
    title('LMS Error Signal');
    saveas(gcf, sprintf('Outputs/lms_error_signal_%s.png', uniqueIdentifier));

    % Save the MSD plot
    figure;
    plot(10 * log10(MSD_LMS_main));
    title('MSD (dB)');
    saveas(gcf, sprintf('Outputs/msd_%s.png', uniqueIdentifier));
end

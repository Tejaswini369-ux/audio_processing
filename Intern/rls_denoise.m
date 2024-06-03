function rls_denoise(lambda, inputFile, M, uniqueIdentifier)
    graphics_toolkit('gnuplot');
    % Function to apply RLS denoising to an EEG signal
    % Parameters:
    %   lambda: Forgetting factor for RLS
    %   inputFile: Name of the input .csv file containing the EEG signal
    %   M: Length of the RLS filter
    %   uniqueIdentifier: Unique identifier for output filenames
    % Default values for delta and fs
    delta = 1e-3;  % Small positive constant to initialize P(0)
    fs = 100;      % Sampling frequency in Hz
    clc;
    close all;

    % Load the EEG signal from the input file
    x = csvread(inputFile);

    % Ensure the data is a column vector
    if size(x, 2) > 1
        error('Input data must be a single column vector.');
    end

    % Scale data if needed
    if max(abs(x)) > 1e7
        x = x / max(abs(x)); % Scale down data
    end

    % Check the length of the signal
    n = length(x);
    % Initialize P and RLS weight vector
    P = (1 / delta) * eye(M); % Initialize P as an identity matrix
    w_rls = zeros(M, 1); % Initialize RLS weight vector

    % Generate the signal corrupted with noise
    D = x;
    A = D + 0.5 * randn(size(D)); % Simulated noisy signal

    % Initialization for RLS algorithm
    B_rls = zeros(1, n); % RLS output signal
    Err_rls = zeros(1, n); % RLS error signal
    weights_rls = zeros(M, n); % Array to store RLS weights

    % Adding padding to the signal for multi-tap processing
    A_padded = [zeros(M-1, 1); A]; % Ensure correct dimensions for padding
    t = (0:n-1) / fs;

    % Apply the RLS algorithm
    for i = M:n
        % Extract the current segment of the signal for multi-tap processing
        A_i = A_padded(i:-1:i-M+1);

        k = (P * A_i) / (lambda + A_i' * P * A_i);
        y_rls = w_rls' * A_i;
        Err_rls(i) = D(i) - y_rls;
        w_rls = w_rls + k * Err_rls(i);
        weights_rls(:, i) = w_rls;
        P = (P - k * A_i' * P) / lambda;
        if any(diag(P) < 1e-10)
            P = max(P, 1e-10 * eye(M));
        end
        B_rls(i) = w_rls' * A_i;
    end

    % Save the noisy signal plot
    figure;
    plot(t, A);
    title('Noisy Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    saveas(gcf, ['Outputs/noisy_signal_', uniqueIdentifier, '.png']);

    % Save the desired signal plot
    figure;
    plot(t, D);
    title('Desired Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    saveas(gcf, ['Outputs/desired_signal_', uniqueIdentifier, '.png']);

    

    % Save the RLS output signal plot
    figure;
    plot(t, B_rls);
    title('RLS Output Signal');
    xlabel('Time (s)');
    ylabel('Amplitude');
    legend('RLS Output');
    saveas(gcf, ['Outputs/rls_output_signal_', uniqueIdentifier, '.png']);

    % Save the error signal plot
    figure;
    plot(t, Err_rls);
    title('RLS Error Signal');
    xlabel('Time (s)');
    ylabel('Error');
    saveas(gcf, ['Outputs/rls_error_signal_', uniqueIdentifier, '.png']);
end

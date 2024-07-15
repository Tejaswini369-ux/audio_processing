function eqrls(W, xi_R, N, SNR_dB,L,delay,uniqueIdentifier)
   num_runs=100;
   delta=0.04;
    % Preallocate for Mean Squared Error
    MSE_sum = zeros(1, N-delay);


    for run = 1:num_runs
        % Generate Bernoulli sequence x_n for this run
        x_n = 2 * randi([0 1], N, 1) - 1;

        % Desired response
        d_n = [x_n(delay+1:end); zeros(delay, 1)]; % Delayed version of input signal

        % Initialize RLS algorithm
        w = zeros(L, 1);
        P = (1/delta) * eye(L);
        lambda = 1; % Forgetting factor (not used here but included for completeness)

        % Preallocate for Mean Squared Error for this run
        MSE = zeros(1, N-delay);

        for n = L:N-delay
            % Input vector for predictor
            u_n = x_n(n:-1:n-L+1);

            % RLS algorithm
            k_n = (P * u_n) / (lambda + u_n' * P * u_n);
            e_n = d_n(n) - w' * u_n;
            w = w + k_n * e_n;
            P = (P - k_n * u_n' * P) / lambda;

            % Mean Squared Error
            MSE(n) = e_n^2;
        end

        % Accumulate MSE for this run
        MSE_sum = MSE_sum + MSE;
    end

    % Ensemble average MSE
    MSE_avg = MSE_sum / num_runs;

    % Plot results
    figure;
    plot(10*log10(MSE_avg));
    xlabel('Sample Index');
    ylabel('MSE (dB)');
    title(sprintf('Adaptive Equalisation RLS'));
    saveas(gcf, sprintf('Outputs/rls_eq_%s.png', uniqueIdentifier));
    close(gcf);
    grid on;
end

% Example usage:
W = 3.1;
xi_R = 11.124;
N = 1000;
SNR_dB = 30;
 L = 11; % Number of taps in the equalizer
 delay = 7; % Delay for desired response
eqrls(W, xi_R, N, SNR_dB,L,delay);

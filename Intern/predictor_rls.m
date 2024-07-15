function predictor_rls(n, sigma_nu, a, lambda,uniqueIdentifier)
    % Initialize variables
    A = -0.98 * ones(1, n);
    mse = zeros(1, n);
    temp = zeros(100, n);
    temp1 = zeros(100, n);

    for k = 1:100
        % Generate the AR(1) process
        u = zeros(1, n);
        nu = sigma_nu * randn(1, n);
        
        for i = 2:n
            u(i) = a * u(i - 1) + nu(i);
        end
        
        % Normalize the input signal
        u = sqrt(1 / var(u)) * u;
        
        % Initialize RLS variables
        w_est = zeros(1, n);  % Filter weights
        P = eye(1) / 0.1;     % Inverse of the covariance matrix
        e = zeros(1, n);      % Error signal
        
        for j = 2:n
            % Regression vector (past values of the input signal)
            phi = u(j - 1);
            
            % Compute the Kalman gain
            k_rls = P * phi / (lambda + phi' * P * phi);
            
            % Calculate the error
            e(j) = u(j) - w_est(j - 1) * phi;
            
            % Update the weights
            w_est(j) = w_est(j - 1) + k_rls' * e(j);
            
            % Update the inverse covariance matrix
            P = (P - k_rls * phi' * P) / lambda;
            
            % Store the squared error
            temp(k, j) = (w_est(j) - a)^2;
            temp1(k, j) = w_est(j);
        end
    end

    % Calculate the mean squared error
    mse = sum(temp) / 100;
    rndwalk = sum(temp1) / 100;

    % Plot desired output
    figure
    stem(1:n, u)
    title('Desired Output')
    xlabel('Number of Samples')
    ylabel('Magnitude')
    saveas(gcf, sprintf('Outputs/desired_output_%s.png', uniqueIdentifier));
    close(gcf);

    % Plot learning curve for RLS
    figure
    plot(1:n, mse, 'r')
    title('Learning curve for RLS')
    xlabel('Number of adaptation cycles, n')
    ylabel('Mean square error')
    saveas(gcf, sprintf('Outputs/learning_curve_%s.png', uniqueIdentifier));
    close(gcf);

    % Plot random walk behaviour
    figure
    plot(1:n, A, 'b')
    hold on
    plot(1:n, rndwalk, 'r')
    title('Random Walk behaviour')
    xlabel('Number of adaptation cycles, n')
    ylabel('Tap Weight')
    saveas(gcf, sprintf('Outputs/random_walk_%s.png', uniqueIdentifier));
    close(gcf);
end
% Parameters
n = 200;
sigma_nu = 0.1;
a = -0.98;
lambda = 0.99;  % Forgetting factor for RLS

% Call the function
predictor_rls(n, sigma_nu, a, lambda);


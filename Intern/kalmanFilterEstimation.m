function kalmanFilterEstimation(N, dt, u, y0, v0, R,uniqueIdentifier)
    t = dt * (1:N); % Time vector
    I = eye(2);
    
    % Define matrices within the function
    F = [1 dt; 0 1];
    G = [-1/2*dt^2; -dt];
    H = [1 0];
    Q = [0 0; 0 0];  % No noise assumed
    x0 = [10; 0];  % Initial estimated state vector
    P0 = [50 0; 0 0.01];  % Initial covariance matrix

    % Initialize state vectors
    xt = zeros(2, N);
    xt(:, 1) = [y0; v0]; % Initial position and velocity
    
    % Generate true states using prediction equations
    for k = 2:N
        xt(:, k) = F * xt(:, k-1) + G * u; % Position and velocity using law of physics
    end
    
    % Generate noisy measurements from the true states
    v = sqrt(R) * randn(1, N);
    z = H * xt + v;
    
    % Perform the Kalman estimation
    x = zeros(2, N);
    x(:, 1) = x0; % Initial estimated state vector
    
    P = P0; % Initial covariance matrix
    
    for k = 2:N
        % Predict the state vector
        x(:, k) = F * x(:, k-1) + G * u; % Finding x_k/k-1
        
        % Predict the covariance matrix
        P = F * P * F' + Q;
        
        % Calculate Kalman filter gain
        K = P * H' / (H * P * H' + R);
        
        % Update and correct the state vector
        x(:, k) = x(:, k) + K * (z(k) - H * x(:, k));
        
        % Update covariance matrix
        P = (I - K * H) * P;
    end
    
    % Plot the states
    figure(1);
    plot(t, z, 'g-', t, x(1, :), 'b--', 'LineWidth', 2);
    hold on;
    plot(t, xt(1, :), 'r:', 'LineWidth', 1.5);
    legend('Measured', 'Estimated', 'True');
    title('Position');
    saveas(gcf, sprintf('Outputs/position_%s.png', uniqueIdentifier));
    close(gcf);
    
    figure(2);
    plot(t, x(2, :), 'LineWidth', 2);
    hold on;
    plot(t, xt(2, :), 'r:', 'LineWidth', 1.5);
    legend('Estimated', 'True');
    title('Velocity');
    saveas(gcf, sprintf('Outputs/velocity_%s.png', uniqueIdentifier));
    close(gcf);
    
    figure(3);
    plot(t, x(1, :) - xt(1, :), 'LineWidth', 2);
    title('Position Error');
    saveas(gcf, sprintf('Outputs/position_error_%s.png', uniqueIdentifier));
    close(gcf);
    
    figure(4);
    plot(t, x(2, :) - xt(2, :), 'LineWidth', 2);
    title('Velocity Error');
    saveas(gcf, sprintf('Outputs/velocity_error_%s.png', uniqueIdentifier));
    close(gcf);
end
N = 1000;    % Number of time steps
dt = 0.001;  % Sampling time
u = 9.80665;
y0 = 100;  % Initial position
v0 = 0;    % Initial velocity
R = 4;     % Error variance in measurement of position

kalmanFilterEstimation(N, dt, u, y0, v0, R);

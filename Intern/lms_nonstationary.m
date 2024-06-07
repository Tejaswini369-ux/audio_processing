function lms_nonstationary(n, M, mu, uniqueIdentifier)

    % n = 1000; 
    x = randn(n, 1); 
    d = sin(0.01 * (1:n)') + 0.5 * randn(n, 1); 
    % non-stationary signal 

    % LMS parameters  
    % mu = 0.01;  
    % M = 4;  

    % Initialize variables  
    w = zeros(M, 1);  
    y = zeros(n, 1); 
    e = zeros(n, 1); 
    w_hist = zeros(n, M);  

    % LMS algorithm  
    for i = M:n  
        x_vec = x(i:-1:i-M+1); 
        y(i) = w' * x_vec;  
        e(i) = d(i) - y(i); 
        w = w + mu * x_vec * e(i); 
        w_hist(i, :) = w';  
    end 

    % Plot results  
    figure('Position', [100, 100, 800, 600]); % Set figure size

    % Adjust spacing
    subplot(3, 1, 1); 
    plot(d, 'DisplayName', 'Desired signal');  
    hold on; 
    plot(y, 'DisplayName', 'LMS output');  
    legend; 
    title('LMS Output vs Desired Signal');  

    subplot(3, 1, 2); 
    plot(e, 'DisplayName', 'Error'); 
    legend;  
    title('Error Signal'); 

    subplot(3, 1, 3); 
    plot(vecnorm(w_hist, 2, 2), 'DisplayName', 'Norm of weight vector'); 
    legend;  
    title('Norm of Weight Vector'); 

    % Increase height and space between plots
    h = 0.25; % New height
    space = 0.05; % Increased spacing

    % Adjust subplot positions and sizes
    subplotPos = [0.13, 0.69, 0.775, h];
    set(gca, 'Position', subplotPos);

    subplotPos(2) = subplotPos(2) - h - space;
    subplot(3, 1, 2);
    set(gca, 'Position', subplotPos);

    subplotPos(2) = subplotPos(2) - h - space;
    subplotPos(4) = 0.35; % Adjust the height for the last subplot
    subplot(3, 1, 3);
    set(gca, 'Position', subplotPos);

    saveas(gcf, sprintf('Outputs/lms_nonstationary_%s.png', uniqueIdentifier));
    close(gcf);

end

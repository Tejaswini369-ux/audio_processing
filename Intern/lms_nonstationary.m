function lms_nonstationary(n,M,mu,uniqueIdentifier)
 %n = 1000;
 x = randn(n, 1);
 d = sin(0.01 * (1:n)') + 0.5 * randn(n, 1);
 % non-stationary signal
 % LMS parameters 
%mu = 0.01; 
%M = 4; 
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
figure; 
plot(d, 'DisplayName', 'Desired signal'); 
hold on;

figure;
 plot(y, 'DisplayName', 'LMS output'); 
legend;
 title('LMS Output vs Desired Signal'); 
saveas(gcf, sprintf('Outputs/lms_nonstationary_output_%s.png', uniqueIdentifier));
close(gcf);
figure;
 plot(e, 'DisplayName', 'Error');
 legend; 
title('Error Signal');
saveas(gcf, sprintf('Outputs/lms_nonstationary_error_%s.png', uniqueIdentifier));
close(gcf);
figure;
plot(vecnorm(w_hist, 2, 2), 'DisplayName', 'Norm of weight vector');
legend; 
title('Norm of Weight Vector');
saveas(gcf, sprintf('Outputs/lms_nonstationary_weight_%s.png', uniqueIdentifier));
close(gcf);
end
